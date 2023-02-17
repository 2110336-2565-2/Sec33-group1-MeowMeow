import { Injectable } from '@nestjs/common';
import { Guide } from 'database';

import { GuideSearchDto } from 'src/guide/dto/guideSearch.dto';
import { PrismaService } from 'src/prisma/prisma.service';

export interface GuideService {
  getAllGuides(): Promise<Guide[]>;
  getGuides(searchInfo: GuideSearchDto): Promise<Guide[]>;
}

@Injectable()
export class GuideServiceImpl {
  constructor(private prisma: PrismaService) {}

  async getAllGuides(): Promise<Guide[]> {
    return await this.prisma.guide.findMany();
  }

  async getGuides(searchInfo: GuideSearchDto) {
    const guidesInArea: number[] = (
      await this.getGuidesInArea(searchInfo.location)
    ).map((x) => x.guideId);

    const guideHighScoreObject = await this.prisma.review.groupBy({
      by: ['guideId'],
      _avg: {
        score: true,
      },
      where: {
        guideId: {
          in: guidesInArea,
        },
      },
      having: {
        score: {
          _avg: {
            gte: searchInfo.reviewScore,
          },
        },
      },
    });

    const guideHighScore = guideHighScoreObject.map((x) => x.guideId);

    const guidesToSend = await this.prisma.guide.findMany({
      where: {
        fee: { lte: searchInfo.fee },
        id: {
          in: guideHighScore,
        },
      },
    });

    return guidesToSend;
  }

  private async getGuidesInArea(name: string) {
    return await this.prisma.location.findMany({
      where: {
        locationName: name,
      },
      select: {
        guideId: true,
      },
    });
  }
}

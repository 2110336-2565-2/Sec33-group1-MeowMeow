import { Injectable } from '@nestjs/common';

import { GuideSearchDto } from 'src/guide/guideSearch.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GuidesService {
  constructor(private prisma: PrismaService) {}

  async getAllGuides() {
    return await this.prisma.guide.findMany();
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
}

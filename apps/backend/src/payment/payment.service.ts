import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { backendConfig } from 'config';
import * as qs from 'qs';
import { firstValueFrom, map } from 'rxjs';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class PaymentService {
  private readonly publicKey: string;
  private readonly secretKey: string;
  private readonly createRecipientUrl: string;
  private readonly chargesUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly userRepository: UsersRepository,
  ) {
    this.publicKey = Buffer.from(backendConfig.omise.publicKey).toString(
      'base64',
    );
    this.secretKey = Buffer.from(backendConfig.omise.secretKey).toString(
      'base64',
    );
    this.createRecipientUrl = backendConfig.omise.createRecipientUrl;
    this.chargesUrl = backendConfig.omise.chargesUrl;
  }

  async createRecipient(data: {
    userId: number;
    taxId?: string;
    brandBankAccount: string;
    numberBankAccount: string;
    nameBankAccount: string;
  }) {
    const user = await this.userRepository.getUserById(data.userId);

    const body = qs.stringify({
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      type: 'individual',
      tax_id: data.taxId,
      'bank_account[brand]': data.brandBankAccount,
      'bank_account[number]': data.numberBankAccount,
      'bank_account[name]': data.nameBankAccount,
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.omise.co/recipients',
      headers: {
        Authorization: `Basic ${this.secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    const res = await firstValueFrom(
      this.httpService
        .post(this.createRecipientUrl, body, config)
        .pipe(map((res) => res.data)),
    );
    if (!res.id) {
      throw new InternalServerErrorException('cannot create recipient');
    }
    return res.id;
  }
}

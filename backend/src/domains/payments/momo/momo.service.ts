import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import axios from 'axios';
import * as crypto from 'crypto';

import momoConfig from '@/domains/payments/momo/config/momo.config';
import { CreateMomoOrderDto } from '@/domains/payments/momo/dto/momo.dto';

@Injectable()
export class MomoService {
	private readonly logger = new Logger(MomoService.name);

	constructor(
		@Inject(momoConfig.KEY)
		private readonly config: ConfigType<typeof momoConfig>,
	) {}

	async create(dto: CreateMomoOrderDto) {
		const { accessKey, secretKey, partnerCode } = this.config;
		const orderInfo = 'Pay with MoMo';
		const redirectUrl = `${process.env.FRONTEND_URL}/student/payment-history/${dto.id}`;
		const ipnUrl = process.env.MOMO_CALLBACK;
		const requestType = 'payWithMethod';
		const extraData = '';
		const orderGroupId = '';
		const autoCapture = true;
		const lang = 'vi';

		const amount = dto.amount;
		const orderId = partnerCode + new Date().getTime();
		const requestId = orderId;

		const rawSignature =
			'accessKey=' +
			accessKey +
			'&amount=' +
			amount +
			'&extraData=' +
			extraData +
			'&ipnUrl=' +
			ipnUrl +
			'&orderId=' +
			orderId +
			'&orderInfo=' +
			orderInfo +
			'&partnerCode=' +
			partnerCode +
			'&redirectUrl=' +
			redirectUrl +
			'&requestId=' +
			requestId +
			'&requestType=' +
			requestType;

		const signature = crypto
			.createHmac('sha256', secretKey)
			.update(rawSignature)
			.digest('hex');

		const requestBody = JSON.stringify({
			partnerCode: partnerCode,
			partnerName: 'Test',
			storeId: 'MomoTestStore',
			requestId: requestId,
			amount: amount,
			orderId: orderId,
			orderInfo: orderInfo,
			redirectUrl: redirectUrl,
			ipnUrl: ipnUrl,
			lang: lang,
			requestType: requestType,
			autoCapture: autoCapture,
			extraData: extraData,
			orderGroupId: orderGroupId,
			signature: signature,
		});

		this.logger.log(`Create order #${orderId}`);
		this.logger.debug(requestBody);

		const endpoint = `${process.env.MOMO_ENDPOINT}/v2/gateway/api/create`;

		const result = await axios.post(endpoint, requestBody, {
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': Buffer.byteLength(requestBody),
			},
		});

		this.logger.debug(result.data);

		return result.data;
	}

	async callback(body: any) {
		this.logger.debug('Callback body', body);
	}
}

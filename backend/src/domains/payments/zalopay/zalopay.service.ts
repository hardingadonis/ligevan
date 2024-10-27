import { TZDate } from '@date-fns/tz';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import axios from 'axios';
import * as crypto from 'crypto';
import { format } from 'date-fns';

import zalopayConfig from '@/domains/payments/zalopay/config/zalopay.config';
import { CreateZaloPayOrderDto } from '@/domains/payments/zalopay/dto/zalopay.dto';

@Injectable()
export class ZalopayService {
	private readonly logger = new Logger(ZalopayService.name);

	constructor(
		@Inject(zalopayConfig.KEY)
		private readonly config: ConfigType<typeof zalopayConfig>,
	) {}

	async createOrder(dto: CreateZaloPayOrderDto) {
		const embed_data = {
			redirecturl: `${process.env.FRONTEND_URL}/student/payment-history/${dto.id}`,
		};

		const items = [];
		const transID = Math.floor(Math.random() * 1000000);
		const date = new TZDate(new Date(), 'Asia/Ho_Chi_Minh');

		const order = {
			app_id: this.config.app_id,
			app_user: 'ligevan',
			app_trans_id: `${format(date, 'yyMMdd')}_${transID}`,
			app_time: Date.now(),
			item: JSON.stringify(items),
			embed_data: JSON.stringify(embed_data),
			amount: dto.amount,
			callback_url: process.env.ZALOPAY_CALLBACK,
			description: `ligevan - Thanh toán cho đơn hàng #${transID}`,
			bank_code: '',
			mac: '',
		};

		const data =
			this.config.app_id +
			'|' +
			order.app_trans_id +
			'|' +
			order.app_user +
			'|' +
			order.amount +
			'|' +
			order.app_time +
			'|' +
			order.embed_data +
			'|' +
			order.item;
		const hmac = crypto.createHmac('sha256', this.config.key1);
		hmac.update(data);
		order.mac = hmac.digest('hex');

		this.logger.log(`Create order #${order.app_trans_id}`);
		this.logger.debug(order);

		const result = await axios.post(this.config.endpoint, null, {
			params: order,
		});

		this.logger.debug(result.data);

		return result.data;
	}
}

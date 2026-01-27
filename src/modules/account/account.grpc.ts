import { Inject, Injectable, OnModuleInit } from "@nestjs/common";

import { AccountServiceClient } from "@mario-teacinema/contracts/gen/account";
import type { ClientGrpc } from "@nestjs/microservices";
import { GetAccountRequest } from "@mario-teacinema/contracts/gen/account";
import { Observable } from "rxjs";
import { GetAccountResponse } from "@mario-teacinema/contracts/gen/account";

@Injectable()
export class AccountClientGrpc implements OnModuleInit {
  private accountService: AccountServiceClient;

  public constructor(
    @Inject("ACCOUNT_PACKAGE") private readonly client: ClientGrpc,
  ) {}

  public onModuleInit() {
    this.accountService =
      this.client.getService<AccountServiceClient>("AccountService");
  }

  public getAccount(
    request: GetAccountRequest,
  ): Observable<GetAccountResponse> {
    return this.accountService.getAccount(request);
  }
}

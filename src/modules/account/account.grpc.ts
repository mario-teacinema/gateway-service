import { Inject, Injectable, OnModuleInit } from "@nestjs/common";

import {
  AccountServiceClient,
  ConfirmEmailChangeRequest,
  ConfirmEmailChangeResponse,
  ConfirmPhoneChangeRequest,
  ConfirmPhoneChangeResponse,
  GetAccountRequest,
  GetAccountResponse,
  InitEmailChangeRequest,
  InitEmailChangeResponse,
  InitPhoneChangeRequest,
  InitPhoneChangeResponse,
} from "@mario-teacinema/contracts/gen/account";
import type { ClientGrpc } from "@nestjs/microservices";
import { Observable } from "rxjs";

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

  public initEmailChange(
    request: InitEmailChangeRequest,
  ): Observable<InitEmailChangeResponse> {
    return this.accountService.initEmailChange(request);
  }

  public confirmEmailChange(
    request: ConfirmEmailChangeRequest,
  ): Observable<ConfirmEmailChangeResponse> {
    return this.accountService.confirmEmailChange(request);
  }

  public initPhoneChange(
    request: InitPhoneChangeRequest,
  ): Observable<InitPhoneChangeResponse> {
    return this.accountService.initPhoneChange(request);
  }

  public confirmPhoneChange(
    request: ConfirmPhoneChangeRequest,
  ): Observable<ConfirmPhoneChangeResponse> {
    return this.accountService.confirmPhoneChange(request);
  }
}

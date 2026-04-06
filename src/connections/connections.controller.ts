import { Controller, Get, Post, Delete, Param, Body, Headers } from '@nestjs/common';
import { ConnectionsService } from './connections.service';
import { JwtService } from '@nestjs/jwt';

@Controller('connections')
export class ConnectionsController {
  constructor(
    private connectionsService: ConnectionsService,
    private jwtService: JwtService,
  ) {}

  private getUser(auth: string) {
    const token = auth.replace('Bearer ', '');
    return this.jwtService.verify(token, { secret: 'my_secret_key' });
  }

  @Post('request/:toUserId')
  sendRequest(@Headers('authorization') auth: string, @Param('toUserId') toUserId: string) {
    const decoded = this.getUser(auth);
    return this.connectionsService.sendRequest(decoded.sub, Number(toUserId));
  }

  @Post('respond/:connectionId')
  respond(
    @Headers('authorization') auth: string,
    @Param('connectionId') connectionId: string,
    @Body() body: { accept: boolean },
  ) {
    const decoded = this.getUser(auth);
    return this.connectionsService.respondRequest(Number(connectionId), decoded.sub, body.accept);
  }

  @Get()
  getConnections(@Headers('authorization') auth: string) {
    const decoded = this.getUser(auth);
    return this.connectionsService.getConnections(decoded.sub);
  }

  @Get('pending')
  getPending(@Headers('authorization') auth: string) {
    const decoded = this.getUser(auth);
    return this.connectionsService.getPendingRequests(decoded.sub);
  }

  @Get('status/:toUserId')
  getStatus(@Headers('authorization') auth: string, @Param('toUserId') toUserId: string) {
    const decoded = this.getUser(auth);
    return this.connectionsService.getConnectionStatus(decoded.sub, Number(toUserId));
  }

  @Delete('remove/:otherUserId')
  removeConnection(@Headers('authorization') auth: string, @Param('otherUserId') otherUserId: string) {
    const decoded = this.getUser(auth);
    return this.connectionsService.removeConnection(decoded.sub, Number(otherUserId));
  }
}
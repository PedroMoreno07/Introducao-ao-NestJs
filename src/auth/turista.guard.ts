import { Injectable } from "@nestjs/common";
import { CanActivate, ExecutionContext } from "@nestjs/common/interfaces";

export class TuristaGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        return user?.role === 'TURISTA';
    }
}
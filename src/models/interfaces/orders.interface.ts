import {IOperation} from "./operationItem.interface";
import { OperationStatus } from "../types/ordersStatus";

export interface IOrders {
    id: number
    name: string
    status: OperationStatus
    createdAt: string
    updatedAt: string
    operations: IOperation[]
}
export interface IReference {
    id: number
    name: string
    createdAt: string
    isProtected: boolean
}
 export interface ITimespan {
    timespanId: number
    startedAt: string
    finishedAt: string
    createdAt: string
    updatedAt: string
    employeeId: number
  }
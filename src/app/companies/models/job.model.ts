import { Boat } from "./boat.model";
import { Proposal } from "./proposal.model";

export interface Job {
    id: number,
    boatId: number,
    isEmergency: boolean,
    title: string,
    description: string,
    submitDate: Date,
    boat: Boat,
    proposals: Proposal[]
}
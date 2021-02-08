import { Job } from "./job.model";
import { ProposalStatus } from "./proposal-status.enum";

export interface Proposal {
    id: number,
    companyId: number,
    jobId: number,
    status: ProposalStatus,
    createdDate: Date,
    changeDate: Date,
    job: Job,
    busy?: boolean
}
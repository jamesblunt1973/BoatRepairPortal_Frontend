import { Job } from "./job.model";

export interface Boat {
    id: number;
    name: string;
    year: number;
    engineType: string;
    description: string;
    jobs: Job[],
    picture: string
}
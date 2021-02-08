import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { ProposalStatus } from "../models/proposal-status.enum";
import { Proposal } from "../models/proposal.model";

@Injectable()
export class ProposalsService {

    private apiUrl = environment.apiUrl + 'proposals/';

    constructor(private http: HttpClient) { }

    getProposals() {
        return this.http.get<Proposal[]>(`${this.apiUrl}?status=${ProposalStatus.pending}`);
    }

    getBoatPictures() {
        let headers = new HttpHeaders().set('Authorization', '563492ad6f917000010000013f80df33f6454fe29ba06659edb4494d');
        return this.http.get('https://api.pexels.com/v1/search?query=boat&per_page=80&page=1', {
            headers: headers
        }).pipe(map((res: any) => {
            return res.photos.map(a => a.src.tiny)
        }));
    }

    updateProposal(id: number, status: ProposalStatus) {
        return this.http.patch(this.apiUrl + 'update', { id, status });
    }
}
import { Component, Input, OnInit } from '@angular/core';
import { Team } from 'src/app/team';
import { TeamService } from 'src/app/team.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

  @Input() engagementId: number ;
  displayedColumns = ['name'] ;
  selectedTeam: Team
  teams: Team[] = [] ; 
  constructor(private teamService: TeamService) { }

  ngOnInit(): void {

    this.teamService.findTeamsByEngagementId(this.engagementId).subscribe(x=>
      this.teams = x) ;

  }

  onSelect(team: Team) {
    this.selectedTeam = team ;

  }

}

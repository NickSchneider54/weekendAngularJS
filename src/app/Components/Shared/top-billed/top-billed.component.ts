import { Component, OnInit, Input } from '@angular/core';
import { CastMember } from 'src/app/Classes/Cast/cast-member';
import { Router } from '@angular/router'

@Component({
  selector: 'app-top-billed',
  templateUrl: './top-billed.component.html',
  styleUrls: ['./top-billed.component.css']
})
export class TopBilledComponent implements OnInit {

  @Input() topBilled: CastMember[]; // array of CastMembers to hold the topBilled cast

  constructor(private router: Router) { }

  ngOnInit() { }
  
    // builds the url for the chosen movie and then navigates to that url using the router
    onSelect(actor: CastMember): void{
      this.router.navigate(['/person', actor.id, actor.name]);
    }
}

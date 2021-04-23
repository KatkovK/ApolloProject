import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular'

interface Character {
  name: string
};

interface Movie {
  id: number,
  name: string,
  air_date: string;
  episode: string;
  names?: Character[]
};

const GET_LISTS = gql`
{
  episodes {
      results {
      id
      name
      air_date
      episode
      characters {
        name
      }
    }
  }
}
`;

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss']
})
export class EpisodesComponent implements OnInit {
  isCancelButtonVisible(e) {    
    return !e.row.isEditing && !e.row.data.isCompleted;
  }

  dataSource: Movie;
  loading = true;
  error: any;
  lists: any;

  constructor(
    private apollo: Apollo,
    private router: Router ) { }

  ngOnInit() {
    this.apollo.watchQuery({
      query: GET_LISTS
    }).valueChanges.subscribe((result: any) => {
      this.dataSource = result.data.episodes.results;
      this.loading = result.loading;
      this.error = result.error;
      console.log(this.dataSource);
    });
  }

  okClicked (e) {
    console.log(e.row.data.characters);
    this.router.navigate(['/episode'])
}
 
}


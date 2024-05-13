import { RWSViewComponent, RWSView,observable } from '@rws-framework/client';
import events from '../../events/events';
import { Pokemon } from 'pokenode-ts';

// import { PokeList } from '../../components/pokemon-list/component';
// import { PokeEntry } from '../../components/pokemon-entry/component';

// PokeList;
// PokeEntry;

@RWSView('page-home')
class HomePage extends RWSViewComponent {  

    @observable searchResults: Pokemon = null;
    @observable loading: boolean = false;

    searchResultsChanged(oldVal: Pokemon, newVal: Pokemon)
    {
 
        this.searchResults = newVal;
        console.log('got search event', newVal);
    }
  
    connectedCallback(): void 
    {
        super.connectedCallback();   
        

        this.on(events.search.in_progress, () => {
            this.loading = true;
        });

        this.on<Pokemon>(events.search.result, (res) => {   
            this.searchResults = res.detail;              

            this.loading = false;            
        });
    }
}

HomePage.defineComponent();

export { HomePage };
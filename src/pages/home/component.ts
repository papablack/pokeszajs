import { RWSViewComponent, RWSView,observable } from '@rws-framework/client';
import events from '../../events/events';
import { allComponents, provideFluentDesignSystem  } from '@fluentui/web-components';
import { Pokemon } from 'pokenode-ts';

// import { PokeList } from '../../components/pokemon-list/component';
// import { PokeEntry } from '../../components/pokemon-entry/component';

// PokeList;
// PokeEntry;

@RWSView('page-home')
class HomePage extends RWSViewComponent {  

    @observable searchResults: Pokemon = null;

    searchResultsChanged(oldVal: Pokemon, newVal: Pokemon)
    {
 
        this.searchResults = newVal;
        console.log('got search event', newVal);
    }
  
    connectedCallback(): void 
    {
        super.connectedCallback();   
        provideFluentDesignSystem().register(allComponents);
        this.on<Pokemon>(events.search.result, (res) => {   
            if(!this.searchResults){
                this.searchResults = res.detail;
            }else{
                this.searchResults = {...(res.detail)};
               
            }                               
        });
    }
}

HomePage.defineComponent();

export { HomePage };
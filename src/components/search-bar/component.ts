import { RWSViewComponent, RWSView, observable } from '@rws-framework/client';
import events from '../../events/events';

import { PokemonClient, Pokemon } from 'pokenode-ts';

@RWSView('search-bar')
class SearchBar extends RWSViewComponent {  
    private api: PokemonClient;

    connectedCallback(): void {
        super.connectedCallback();

        this.api = new PokemonClient();
    }

    enter(event: KeyboardEvent)
    {
        if(event.code === 'Enter'){
            this.pokeSearch();
        }        
    }

    async pokeSearch(): Promise<any>
    {
        console.log('yoyoyo');
        const searchVal: string = (this.$('#poke-search-val') as HTMLInputElement).value;

        try {
            this.$emit(events.search.in_progress, true);
            const results: Pokemon = await this.api.getPokemonByName(searchVal);
            this.$emit(events.search.result, results);        
        } catch(error: Error | any){
            this.notifyService.alert('No pokemon found.')
        }
    }
}

SearchBar.defineComponent();

export { SearchBar };
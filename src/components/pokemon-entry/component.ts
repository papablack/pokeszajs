import { RWSViewComponent, RWSView, attr, observable } from '@rws-framework/client';
import { PokemonClient, Pokemon } from 'pokenode-ts';

@RWSView('poke-entry')
class PokeEntry extends RWSViewComponent {  
  
    @observable data: Pokemon = null;
    @attr pokeId: string | null = null;
    @observable current: boolean = false;
    private api: PokemonClient;
    

    async connectedCallback(): Promise<void> {
        super.connectedCallback();
        this.api = new PokemonClient();

        this.data = await this.api.getPokemonByName(this.pokeId);    }
}

PokeEntry.defineComponent();

export { PokeEntry };
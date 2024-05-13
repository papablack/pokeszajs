import { RWSViewComponent, RWSView, observable } from '@rws-framework/client';
import { PokemonClient, EvolutionClient, EvolutionChain, ChainLink, Pokemon, PokemonSpecies } from 'pokenode-ts';


@RWSView('poke-list')
class PokeList extends RWSViewComponent {  
  
    @observable searchData: Pokemon;
    @observable evolutionChain: ChainLink;
    @observable evolutionOrder: string[] = [];

    private api: PokemonClient;

    async searchDataChanged(oldV:Pokemon , newV: Pokemon)
    {
        this.searchData = newV;

        if((oldV && newV && oldV.name !== newV.name)){
            this.api = new PokemonClient();
            await this.go();
        }
    }

    async connectedCallback(): Promise<void>
    {
        super.connectedCallback();
        this.api = new PokemonClient();
                   
        await this.go();
    }

    private async go(): Promise<void>
    {
        const species: PokemonSpecies = await this.api.getPokemonSpeciesByName(this.searchData.species.name);
        const evoUrl: string = species.evolution_chain.url;
        
        this.evolutionOrder = [];

        this.evolutionChain = (await (new EvolutionClient()).getEvolutionChainById(((await this.apiService.get<EvolutionChain>(evoUrl)).id))).chain;  
        console.log('LOADED POKE SEARCH', species, this.evolutionChain);

        if(this.evolutionChain.evolves_to.length === 0){
           
            this.addPokemon(this.searchData.name);
            return;
        }                          
       
        if(this.evolutionChain.species.name !== this.searchData.species.name){                        
            this.addPokemon(this.evolutionChain.species.name);         
        }

        if(this.evolutionChain.evolves_to){
        
            const evolveList = this.evolutionChain.evolves_to;        
            let evolution: ChainLink = evolveList[0];    

            if(evolution.species.name === this.searchData.species.name){                
                evolution = evolution.evolves_to.length ? (evolution.evolves_to[0]) : null;
            }

            const evolveToName = evolution ? evolution.species.name : null;            

            if(evolveToName){
                if(species.evolves_from_species && species.evolves_from_species.name === evolveToName){
                    this.addPokemon(evolveToName);
                    this.addPokemon(this.searchData.species.name);

                }else{
                    this.addPokemon(this.searchData.species.name);
                    this.addPokemon(evolveToName);
                }               
            }     
            
            if(!species.evolves_from_species){
                const final = evolution.evolves_to.length ? (evolution.evolves_to[0]) : null;

                if(final){
                    this.addPokemon(final.species.name);

                }
            }
        }else{
            this.addPokemon(this.searchData.species.name); 
        }    
    }

    private addPokemon(pokemonName: string)
    {
        this.evolutionOrder = [...(this.evolutionOrder), pokemonName];
    }
}

PokeList.defineComponent();

export { PokeList };
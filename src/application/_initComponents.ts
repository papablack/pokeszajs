import { DefaultLayout } from '../components/default-layout/component';
import { RWSClientInstance } from '@rws-framework/client/src/client';
import { SearchBar } from '../components/search-bar/component';
import { PokeEntry } from '../components/pokemon-entry/component';
import { PokeList } from '../components/pokemon-list/component';


export default (parted: boolean) => {
    DefaultLayout;    
    
    if(!parted){
        SearchBar;
        PokeEntry;
        PokeList;
    }

    RWSClientInstance.defineAllComponents();
};
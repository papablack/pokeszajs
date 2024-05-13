import { DefaultLayout } from '../components/default-layout/component';
import { RWSClientInstance } from '@rws-framework/client/src/client';
import { SearchBar } from '../components/search-bar/component';
import { PokeEntry } from '../components/pokemon-entry/component';
import { PokeList } from '../components/pokemon-list/component';
import { allComponents, provideFluentDesignSystem  } from '@fluentui/web-components';


export default (parted: boolean) => {
    DefaultLayout;    
    
    if(!parted){
        SearchBar;
        PokeEntry;
        PokeList;
    }
    
    provideFluentDesignSystem().register(allComponents);
    RWSClientInstance.defineAllComponents();
};
import { Component } from "@angular/core";
import { PokedexService } from "../pokedex.service";
import { Pokemon } from "../pokemon";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  title = "pokedex";
  pokemon: Pokemon[] = [];
  isLoading: boolean = false;
  error: boolean = false;

  constructor(private pokedexService: PokedexService) {}

  ngOnInit() {
    this.loadMore();
    console.log(this.pokemon);
  }
  loadMore() {
    this.isLoading = true;

    /**
     * Use the Pokedex service
     * to load the next 9 Pokemon.
     */
    this.pokedexService.getPokemon(this.pokemon.length, 9).subscribe(
      (pokemon: any[]) => {
        console.log("from app.component", pokemon);
        pokemon = pokemon.map((p) => {
          //map()
          p.imageLoaded = false;
          console.log(p);
          return p;
        });

        /**
         * If loading was successful
         * we append the result to the list.
         */
        this.pokemon = [...this.pokemon, ...pokemon]; //mergeMap()
        this.isLoading = false; //tap()
        this.error = false; //catchError()
      },
      (error: any) => {
        this.error = true;
        this.isLoading = false; //finalize()
      }
      //this error handling works, but you could/should use catchError from rxjs since youve been using rxjs in other spots
      //also use tap() to propagate your loading in the call.
      //then finalize() to turn off loading once the call is complete
      //NOT NEEDED per say, but is best practice and makes it more performant and readable
      //overall nice work man
    );
  }

  //something needs to happen here to turn off that subscription you made in the onInit. There is a lifecycle hook you can call to unsubscibe to that observable you made.
  //this may mean you need to recfactor that call to use a subscription object like this:
  /*

  public subs = {
    getPokemon = new Subscription()
  }
  loadMore(){
    this.subs.getPokemon =  this.pokedexService.getPokemon(this.pokemon.length, 9)
      .subscribe(
        (pokemon: any[]) => {
          console.log('from app.component',pokemon);
          pokemon = pokemon.map(p => { //map()
            p.imageLoaded = false;
            console.log(p)
            return p;
          });

          this.pokemon = [...this.pokemon, ...pokemon]; //mergeMap()
          this.isLoading = false; //tap()
          this.error = false; //catchError()
        },
        (error: any) => {
          this.error = true;
          this.isLoading = false; //finalize()
        }
      }

    //then you can unsub to this subscription and keep it clean and the data source fresh
    //will also allow you to use the async pipe in the html and avoid some of this logic


    //overall nice work though. these are just small critiques to help you whern shit gets alot larger 





    //for example, this is a subscriber I wrote this morning for work - I use rxjs very heavily as it lets me have a ton of flexibility, but it isnt always needed nor the best option
    // CHECKS THE TOP LEVEL FILTERS APPLIED BEFORE PAGE NAVIGATION AND RELOADS/LOADS THEM
        this.subscriptions.filterState = this.aeFilterService.filterState$
            .pipe(
                tap(() => this.aeFilterService.updateDataLoaded(false)),
                switchMap((filters: any): any => {
                    this.filtersApplied = filters;
                    // DESTRUCTURE PRODUCTS - placed here to make sure filters are loaded for tab navigation
                    const productFilterSelections = {
                        deployed: [
                            { product: 'Avi', filter: this.filterSelections.aviDeployed },
                            { product: 'NSX', filter: this.filterSelections.nsxDeployed },
                            { product: 'VMCU+', filter: this.filterSelections.vmcu_plus },
                          ],
                          booked: [
                            { product: 'Avi', filter: this.filterSelections.aviLanded },
                            { product: 'NSX', filter: this.filterSelections.nsxLanded },
                            { product: 'NSX Security', filter: this.filterSelections.nsx_security_booked },
                            { product: 'Cloud Mgmt Landed', filter: this.filterSelections.cloud_mgmt_booked },
                            { product: 'vSAN', filter: this.filterSelections.vsan_booked },
                            { product: 'VxRail', filter: this.filterSelections.vxrail_booked },
                            { product: 'VMCU', filter: this.filterSelections.vmcu_booked },
                            { product: 'SDDC', filter: this.filterSelections.sddc_booked },
                            { product: 'vSphere Landed', filter: this.filterSelections.vsphere_booked }
                          ],
                          pipeline: [
                            { product: 'Avi', filter: this.filterSelections.avi_pipeline },
                            { product: 'NSX', filter: this.filterSelections.nsx_pipeline },
                            { product: 'NSX Security', filter: this.filterSelections.nsx_security_piped },
                            { product: 'Cloud Mgmt Pipeline', filter: this.filterSelections.cloud_mgmt_piped },
                            { product: 'vSAN', filter: this.filterSelections.vsan_piped },
                            { product: 'VxRail', filter: this.filterSelections.vxrail_piped },
                            { product: 'VMCU', filter: this.filterSelections.vmcu_piped },
                            { product: 'SDDC', filter: this.filterSelections.sddc_piped }
                          ]
                    };

                    //APPLYING FILTER VALUES
                    this.filterSelections.geo.setFilterValues(this.filterOptions.geo);
                    this.filterSelections.division.setFilterValues(this.filterOptions.division);
                    this.filterSelections.country.setFilterValues(this.filterOptions.country);
                    this.filterSelections.elaQuarter.setFilterValues(this.filterOptions.elaQuarter);
                    this.filterSelections.dream_big_focus_type.setFilterValues(this.filterOptions.dream_big_focus_type)
                    this.filterSelections.pursuit_trans_type.setFilterValues(this.filterOptions.pursuit_trans_type)

                    //APPLYING CORE FILTERS
                    this.filterSelections.geo.setModel({ values: filters.geo.length > 0 ? [...filters.geo] : null });
                    this.filterSelections.division.setModel({ values: filters.division.length > 0 ? [...filters.division] : null });
                    this.filterSelections.country.setModel({ values: filters.country.length > 0 ? [...filters.country] : null });
                    this.filterSelections.elaQuarter.setModel({ values: filters.elaQuarter.length > 0 ? [...filters.elaQuarter] : null });
                    this.filterSelections.dream_big_focus_type.setModel({ values: filters.dream_big_focus_type.length > 0 ? [...filters.dream_big_focus_type] : null });

                    //APPLY [Y] FILTERS
                    this.filterSelections.top5_next5.setModel({ values: filters.campaign_name.includes('top5_next5') ? ['Y'] : null });
                    this.filterSelections.twok.setModel({ values: filters.campaign_name.includes('2K') ? ['Y'] : null });
                    this.filterSelections.top8.setModel({ values: filters.global.includes('TOP 8') ? ['Y'] : null });
                    this.filterSelections.next12.setModel({ values: filters.global.includes('NEXT 12') ? ['Y'] : null });
                    this.filterSelections.ela.setModel({ values: filters.ela.includes('ELA') ? ['Y'] : null });
                    this.filterSelections.inDice.setModel({ values: filters.inDICE.includes('IN DICE') ? ['Y'] : null });
                    //if they would like a campaign button vs the multi select this will work for both methods
                    // this.filterSelections.dream_big_focus_type.setModel({ values: filters.campaign_name.includes('Dream_Bigger') ? ['Focus', 'Investment'] : filters.dream_big_focus_type.length > 0 ? [...filters.dream_big_focus_type] : null  });

                    //APPLYING PRODUCT FILTERS
                    if (filters.deployed.length > 0) {
                        filters.deployed.forEach((dep: string) => {
                            const product = dep.split(' ')[0];
                            const value = dep.split('(').pop().substring(0, 1);
                            const filteredProduct = productFilterSelections.deployed.find((item) => item.product === product);
                            if (filteredProduct) {
                                filteredProduct.filter.setModel({ values: [value] });
                            }
                        });
                    }

                    if (filters.booked.length > 0) {
                        filters.booked.forEach((dep: string) => {
                            const product = dep.split(' (')[0].trim();
                            const value = dep.split('(').pop().substring(0, 1);
                            const filteredProduct = productFilterSelections.booked.find((item) => item.product === product);
                            if (filteredProduct) {
                                filteredProduct.filter.setModel({ values: [value] });
                            }
                        });
                    }

                    if (filters.pipeline.length > 0) {
                        filters.pipeline.forEach((dep: string) => {
                            const product = dep.split(' (')[0]
                            const value = dep.split('(').pop().substring(0, 1);
                            const filteredProduct = productFilterSelections.pipeline.find((item) => item.product === product);
                            if (filteredProduct) {
                                filteredProduct.filter.setModel({ values: [value] });
                            }
                        })
                    }

                    //REFRESH THE GRID
                    this.gridApi.onFilterChanged();
                    return '';
                }),
                catchError(() => of([])),
                tap(() => this.aeFilterService.updateDataLoaded(true))
            )
            .subscribe();

  */
}

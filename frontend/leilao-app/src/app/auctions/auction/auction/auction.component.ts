import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { AuctionsService } from 'src/app/services/auction.services';
import { Items } from 'src/shared/items.model';
import { Bids } from 'src/shared/bids.model';
import { BidsService } from 'src/app/services/bids.service'
import { FormGroup, FormControl } from '@angular/forms';
import { Participants } from 'src/shared/participants.models';
import {LOCALE_ID} from '@angular/core';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css'],
  providers: [ AuctionsService, BidsService, 
    {
      provide: LOCALE_ID,
      useValue: "en-US"
    } 
  ]
})
export class AuctionComponent implements OnInit {
  
  public user: Participants
  public item: Items
  public bids: Bids

  /* Lance  */
  public bid: Bids = new Bids(null," "," ")

  constructor(
    private route: ActivatedRoute,
    private auctionService: AuctionsService,
    private bidsService: BidsService,
    ){ }

  ngOnInit(): void {
    this.auctionService.getAuctionsByID(this.route.snapshot.params['id'])
      .then(( item: Items ) =>{
        this.item = item
    } )
    this.highestBid()
    
  }

  public formBid: FormGroup = new FormGroup({
    'valueBid': new FormControl(null),
  })
  
  public makeABid(): void{
    if(this.formBid.value.valueBid <= this.bids.value ){
      window.alert("\nLance menor do que o maior lance atual!")
    } 
    else if(this.formBid.value.valueBid == undefined){
      window.alert("\nNenhum valor encontrado!")
    }
    else if(isNaN(this.formBid.value.valueBid)){
      window.alert("\nInsira um valor numérico!")
    }
    else{
    this.bid.itemId = this.item.id
    this.bid.participantId = localStorage.getItem('idParticipant')
    this.bid.value = this.formBid.value.valueBid
    this.bidsService.makeBid(this.bid)
    .subscribe()
    window.alert("\nLance realizado!")
    }
    this.formBid.reset()
  }

  public highestBid(): void{
    this.bidsService.getHighestBid(this.route.snapshot.params['id'])
      .then(( bids: Bids ) =>{
        this.bids = bids
        console.log(this.bids.value)
    } )
  }


}

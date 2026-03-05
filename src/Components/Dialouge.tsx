import * as React from "react";
import { Dialog } from "radix-ui";
import '../Styles/TextIconButton.css'
import '../Styles/Dialouge.css'
import Icon from "./Icon";
import FilterChip from "./FilterChip";
import filters from "../assets/filters";

function FilterDialouge() {
  return (
    <Dialog.Root>
		<Dialog.Trigger asChild>
      <button className='text-icon-button'>Filters<Icon name='tune'></Icon></button>
		</Dialog.Trigger>
		<Dialog.Portal>
			<Dialog.Overlay className="DialogOverlay grainy-bg-blur-dark" />
			<Dialog.Content className="DialogContent">
				<Dialog.Title><h1 className="DialogTitle">Filters</h1> <hr></hr></Dialog.Title>
				<Dialog.Description className="DialogDescription">
					<div className="filter-dialouge-content">
            <div className="filter-dialouge-filter-holder">
              <h2>Subject</h2>
              <div className="filter-chip-holder">
              {filters.map( (text, index) => (
                <FilterChip text={text} key={index}/>
              ))}
              </div>
            </div>
            <div className="filter-dialouge-filter-holder">
              <h2>Class Type</h2>
              <div className="filter-chip-holder">        
              </div>
            </div>
            <div className="filter-dialouge-filter-holder">
              <h2>Subject</h2>
              <div className="filter-chip-holder">
              {filters.map( (text, index) => (
                <FilterChip text={text} key={index}/>
              ))}
              </div>
            </div>
          </div>
				</Dialog.Description>
				<div
					style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
				>
					<Dialog.Close asChild>
						<button className="Button green">Save changes</button>
					</Dialog.Close>
				</div>
				<Dialog.Close asChild>
					<button className="IconButton" aria-label="Close">
            <Icon name="close"></Icon>
					</button>
				</Dialog.Close>
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>
  )	
}

export default FilterDialouge;


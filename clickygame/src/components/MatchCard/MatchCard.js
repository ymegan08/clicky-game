import React from "react";
import "./MatchCard.css";

const MatchCard = props => (
	<div onClick={() => props.setClicked(props.id)} className="card col-md-3">
		<div className="img-container">
			<img alt={props.name} src={props.image} id={props.id} />
		</div>
	</div>
);

export default MatchCard;
import React, {Component} from 'react';
import { Item, Label } from 'semantic-ui-react';



class Event extends Component{
  constructor(props) {
    super(props);
    this.state={
      className: 'large bookmark icon'
    }
  }
  handleSavedEvent(id){
    console.log('item id', id);
    //key would hold the id or something that identifies the entry to be saved in the db
    if (this.state.className === 'large bookmark icon saved-bookmark' ){
      this.setState({className: 'large bookmark icon'});
    }else{
      this.setState({className: 'large bookmark icon saved-bookmark'});
    }

  }

  render() {
    return (
      <Item>
        <Item.Image src={this.props.event.photoUrl} />
        <Item.Content>
          <Item.Header style={{fontSize: '0.9em'}} as='a'>{this.props.event.eventName}</Item.Header>
          <Item.Meta>
            <span style={{fontSize: '0.8em'}} className='cinema'>Time: {this.props.event.time? this.props.event.time: 'Anytime'}</span>
            <br/>
            <span style={{fontSize: '0.8em'}} className='cinema'>Price: {this.props.event.price}</span>
            <br/>
            <a style={{fontSize: '0.8em', color: '#00007f'}} className='cinema' href={this.props.event.url} target='_blank'>Event Link</a>
            <br/>
            <span style={{fontSize: '0.8em'}} className='cinema'>{this.props.event.date ?'Date: '+ this.props.event.date: '' }</span>
          </Item.Meta>
          <Item.Description style={{fontSize: '0.7em'}}>Address:
            <br/>
            {this.props.event.location.line_1}
          {'  ' + this.props.event.location.line_2}
            <br/>
          {this.props.event.location.city}
            {' '+ this.props.event.location.state}
            <br/>
            {this.props.event.location.zip ? ' '+ this.props.event.location.zip : ''}
          </Item.Description>
          <Item.Extra>
            <Label>{this.props.event.category}</Label>

            <i onClick={this.handleSavedEvent.bind(this, this.props.event.id)} className={this.state.className}/>

          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

export default Event;

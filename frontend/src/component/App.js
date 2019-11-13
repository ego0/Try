import React, { Component } from 'react';
// import mobx-react for convered with mobX
import { observer } from 'mobx-react'
import {api} from '../config/api'

let car_id = null // variable for define for edit card
class App extends Component {
    state = {
        edit: false,
        name: '',
        description: '',
        image: '',
        price: ''
    }
    // handle image
    handleImage(e){
        this.setState({
            image: e.target.files[0]
        })
    }
    // handle change if any onchange for each field
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    componentDidMount() {
        this.props.store.fetchProduct()
    }
    // function change to edit mode
    edit(prod) {
        this.setState({
            edit: true,
            name: prod.name,
            description: prod.description,
            image: prod.image,
            price: prod.price
        })
        car_id = prod.id
    }
    // function for cancel edit mode to normal
    cancel() {
        this.setState({edit: false})
        car_id = null
    }
    // function for remove product
    remove(id) {
        let r = window.confirm("Are you sure remove this product ?")
        if (r) {
            this.props.store.removeProduct(id)
            this.props.store.fetchProduct()
            alert(this.props.store.status)
        }
    }
    // function for save edit if any change on field
    saveEdit(id) {
        const formData = new FormData()
        formData.append(
            'file',
            this.state.image
        )
        formData.set('name', this.state.name)
        formData.set('description', this.state.description)
        formData.set('price', this.state.price)
        let r = window.confirm("Are you sure to update the product ?")
        if (r) {
            this.props.store.updateProduct(formData, id)
            this.props.store.fetchProduct()
        }
        this.setState({edit: false})
        car_id = null
    }
    // function for change button mode edit or not
    buttonHtml(prod) {
        if (this.state.edit) {
            return (
                <div>
                    <button className="btn btn-sec" onClick={()=> this.saveEdit(prod.id)}>Save</button><br/>
                    <button className="btn btn-dg" style={{margin: '0px'}} onClick={()=> this.cancel()}>Cancel</button>
                </div> 
            )
        }
        return(
            <div>
                <button className="btn btn-sec" onClick={()=> this.edit(prod.id)}>Edit</button><br/>
                <button className="btn btn-dg" style={{margin: '0px'}} onClick={()=> this.remove(prod.id)}>Remove</button>
            </div>)
    }
    render() {
        let products = ''
        if (this.props.store.products.data) {
            products = this.props.store.products.data.map(prod => {
                const button = this.buttonHtml(prod)
                if (car_id === prod.id) {
                    console.log(prod.image, '??')
                    return (
                        <div className={"wrapper card-"+prod.id} key={prod.id}>
                            <div className="product-img">
                                <input type="file" name="file" onChange={(e) => this.handleImage(e)}/>
                                {}
                                <img src={prod.image ? api + prod.image : "./default.jpeg"} height="261" width="212" alt={prod.name}/>
                            </div>
                            <div className="product-info">
                                <div className="product-text">
                                    <input defaultValue={prod.name} className="form-control" type="text" name="name" onChange={(e) => this.handleChange(e)}></input>
                                    <textarea defaultValue={prod.description} className="form-control" name="description" onChange={(e) => this.handleChange(e)}></textarea>
                                </div>
                                <div className="prduct-btn">
                                    {button}
                                </div>
                                <div className="product-price-btn">
                                    <input defaultValue={prod.price} type="text" className="form-control" name="price" onChange={(e) => this.handleChange(e)}/>
                                </div>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div className="wrapper" key={prod.id}>
                        <div className="product-img">
                            <img src={prod.image ? api + prod.image : "./default.jpeg"} height="261" width="212"  alt={prod.name}/>
                        </div>
                        <div className="product-info">
                            <div className="product-text">
                                <h1>{prod.name}</h1>
                                <p>{prod.description}</p>
                            </div>
                            <div className="prduct-btn">
                                <button className="btn btn-sec" onClick={()=> this.edit(prod)}>Edit</button><br/>
                                <button className="btn btn-dg" style={{margin: '0px'}} onClick={()=> this.remove(prod.id)}>Remove</button>
                            </div>
                            <div className="product-price-btn">
                                <p><span>RP.{prod.price}</span></p>
                            </div>
                        </div>
                    </div>
                    )
                }
            })
        }
        return (
            <div>
                {products}
            </div>
        );
    }
}

export default observer(App);
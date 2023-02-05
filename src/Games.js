import React from 'react';

class Games extends React.Component{
    constructor(props){
        super(props);
        this.state = {objs:this.props.objs,objs2:[],shop:0,stock:0,total:0}
    }

    Search(e){
        e.target.value.trim()!==''
        ?this.setState({objs:this.props.objs.filter((obj)=>obj.name.toLowerCase().includes(e.target.value.toLowerCase()))})
        :this.setState({objs:this.props.objs})
    }

    changeState(e){
        e==='All'?
        this.setState({objs:this.props.objs})
        :this.setState({objs:this.props.objs.filter((ee)=>ee.cate===e)})
    }

    AddToCart=(e)=>{
        let av=false;
        this.state.objs2.forEach(ee=>{
            if(ee.ref===e.ref) av=true
        })
        av===false&&this.setState({
            objs2:[...this.state.objs2,e],
            total:this.state.total+e.price,
            stock:this.state.stock+1
        })
    }
    
    Undo=(e)=>{
        let [objs_2,some] = [this.state.objs2.filter((ee)=>ee.ref!==e.ref),0]
        objs_2.forEach(e=>some=some+e.price)
        this.setState({
            objs2:objs_2,
            total:some,
            stock:objs_2.length,
            shop:objs_2.length===0?0:1
        })
    }

    ShopCard=()=>{
        return(
            <div className='shopCardP'>
                <div className='closeP' onClick={()=>{this.setState({shop:0})}}>
                    <img src="icon/close.png" alt=''/>
                </div>
                <div className='text-light'>
                    Total : {this.state.total}$
                </div>
                <div className='shopCard'>
                    {this.state.objs2.map((e,i)=>
                    <div key={i} className='py-1 d-flex align-items-center justify-centent-evenly'>
                        <img style={{width:'100px'}} className='col-3' src={e.url} alt=''/>
                        <div style={{backgroundColor:'#1B1C20'}} className='col-9 py-3'>
                            <p className='text-center text-light'>{e.name}</p>
                            <p className='text-center text-light'>{e.price}$</p>
                            <input onClick={()=>{this.Undo(e)}} value='remove ' type='button' className='btn btn-danger text-light col-7 d-block mx-auto'/>
                        </div>
                    </div>
                    )}
                    {this.state.total>0 && <input value='Buy' type='button' className='mt-3 col-8 d-block mx-auto btn btn-success'/>}
                </div>
            </div>
        )
    }

    render(){
        return(
            <div className='container-fluid p-0 d-flex flex-column align-items-center'>
                <header className='d-flex col-12 align-items-center py-1'>
                    <img className='logo' src="icon/logo.png" alt="" />
                    <div className='links'>
                    {this.props.nav.map((e,i)=>
                        <span onClick={()=>this.changeState(e)} key={i} className='nav-link text-center'>{e}</span>
                    )}
                    </div>
                    <div onClick={()=>{document.querySelector('body').classList.toggle('open')}} className='menu'>
                        <span></span><span></span><span></span>
                    </div>
                    <div className='shopIcon'>
                        <img onClick={()=>this.state.stock>=1&&this.setState({shop:1})} style={{height:'40px',cursor:'pointer'}} src='icon/SC.png' alt='shop Icon'/>
                        <span>{this.state.stock}</span>
                    </div>
                </header>
                <div style={{margin:'100px 0 10px 0'}} className="form-floating mx-auto col-lg-8 col-sm-10 d-flex">
                    <input onChange={(e)=>{this.Search(e)}} className="form-control border border-dark" placeholder="name@example.com"/>
                    <label>Game Name</label>
                    <button className="btn btn-primary mx-1 col-lg-2 col-sm-2">Search</button>
                </div>

                <div className='col-lg-11 col-sm-12 d-flex justify-content-evenly flex-wrap'>
                    {this.state.objs.map((e,i)=>
                        <div key={i} className='cadre py-3 col-lg-4 col-md-6 col-sm-11 d-flex flex-column align-items-center justify-centent-center'>
                            <img className='col-9' src={e.url} alt=''/>
                            <div style={{backgroundColor:'#1B1C20'}} className='col-9 pb-3'>
                                <p className='text-center text-light my-2'>{e.name}</p>
                                <p className='text-center text-light my-2'>{e.price}$</p>
                                <input onClick={()=>{this.AddToCart({...e})}} value='ADD To Cart' type='button' className='col-6 d-block mx-auto btn btn-primary'/>
                            </div>
                        </div>
                    )}
                </div>
                {this.state.shop===1 && (this.state.stock>0 && this.ShopCard())}
            </div>
    )}
}
export default Games;
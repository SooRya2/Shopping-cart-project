if(document.readyState=='loading')
{
    document.addEventListener('DOMContentLoaded',ready)

}
else{
    ready()
}


function ready(){



    var removecartbutton=document.getElementsByClassName('cart-quantity-button')

    for (var i=0;i<removecartbutton.length;i++)
    {
        var button=removecartbutton[i]
        button.addEventListener('click',function(event){
            var buttonclicked=event.target
            buttonclicked.parentElement.parentElement.remove()
            updatetotal()
        })
    }

    var quantityInputs=document.getElementsByClassName('cart-quantity-input')
    for(var i=0;i<quantityInputs.length;i++)
    {
        var quantityinput=quantityInputs[i]
        quantityinput.addEventListener('change',function(event){
            var input=event.target
            if(isNaN(input.value) || input.value<=0)
                input.value=1
            updatetotal()
        })

    }

        
    var addtocartbuttons=document.getElementsByClassName('shop-item-button')
    for(var i=0;i<addtocartbuttons.length;i++)
    {
        var button=addtocartbuttons[i]
        button.addEventListener('click',function(event){
            var input=event.target
            var shopItem=input.parentElement.parentElement
            var title=shopItem.getElementsByClassName('shop-item-title')[0].innerText
            var price=shopItem.getElementsByClassName('shop-item-price')[0].innerText
            addItemtocart(title,price)
            updatetotal()
        })
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click',function(event){
        alert("Thank you for your purchase")
        var cartitems=document.getElementsByClassName('cart-items')[0]
        while(cartitems.hasChildNodes())
        {
            cartitems.removeChild(cartitems.firstChild)
        }
        updatetotal()
    })


    

}


function addItemtocart(title,price)
{
    var cartrrow=document.createElement('div')
    cartrrow.classList.add('cart-row')
    var cartItems=document.getElementsByClassName('cart-items')[0]
    var cartitemnames=cartItems.getElementsByClassName('cart-item-title')
    for(var i=0;i<cartitemnames.length;i++)
    {
        if(cartitemnames[i].innerText==title)
        {
            alert('the item is already added')
            return
        }
    }
    var cartrowcontents=`
        <div class="cart-row">
            <span class="cart-item-title cart-column">${title}</span>
            <span class="cart-price cart-column">${price}</span>
            <div class="cart-quantity cart-column">
                <input  class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger cart-quantity-button" type="button">Delete</button>
            </div>
        </div>`
    cartrrow.innerHTML=cartrowcontents
    cartItems.append(cartrrow)
    cartrrow.getElementsByClassName('btn-danger')[0].addEventListener('click',function(event){
        var buttonclicked=event.target
        buttonclicked.parentElement.parentElement.remove()
        updatetotal()
    })
}



function updatetotal()
{
    var cartitemcontainer=document.getElementsByClassName('cart-items')[0]
    var cartrows=cartitemcontainer.getElementsByClassName('cart-row')
    var total=0
    for(var i=0;i<cartrows.length;i++)
    {
        var cartRow=cartrows[i]
        var priceElement=cartRow.getElementsByClassName('cart-price')[0]
        var quanElement=cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price=parseFloat(priceElement.innerText)
        var quantity=quanElement.value
        total=total+(price*quantity)
    }
    
    document.getElementsByClassName('cart-total-price')[0].innerText=total
}


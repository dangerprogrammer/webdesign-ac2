const [budgetsAmout, budgetsOption, monthlyDiscount, fullDiscount, monthlyPrice, fullPrice] = getByIds('budgets-amount', 'budgets-option', 'monthly-discount', 'full-discount', 'monthly-price', 'full-price');

let amount = 0,
    option = budgetsOption.options[budgetsOption.selectedIndex].value,
    plansSize = {'monthly': 1, 'anual': 12};

updatePrice();

budgetsOption.addEventListener('change', ({ target: { options, selectedIndex } }) => {
    option = options[selectedIndex].value;

    updatePrice();
});

budgetsAmout.addEventListener('change', ({ target: { value } }) => {
    amount = +value;

    updatePrice();
});

function updatePrice() {
    const totalMonths = (plansSize[option] || 0) * amount, discountTimes = Math.floor(totalMonths / 6), defaultPrice = 200,
        initialPrice = defaultPrice * totalMonths;
    let fullRealPrice = initialPrice;

    fullRealPrice *= (1 - 5 / 100) ** discountTimes;

    const mensalDiscount = (initialPrice - fullRealPrice) / totalMonths,
        mensalDiscountTxt = (-mensalDiscount || -0).toLocaleString('pt-br', { style: 'currency', currency: 'BRL'}),
        fullDiscountTxt = (-(initialPrice - fullRealPrice)).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

    monthlyDiscount.innerHTML = mensalDiscountTxt;
    fullDiscount.innerHTML = fullDiscountTxt;

    monthlyPrice.innerHTML = ((fullRealPrice / totalMonths) || 0).toLocaleString('pt-br', { style: 'currency', currency: 'BRL'});
    fullPrice.innerHTML = fullRealPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL'});
};

function getByIds(...ids) {
    return ids.map(id => document.getElementById(id));
};
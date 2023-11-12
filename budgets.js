const [budgetsAmout, budgetsOption, budgetsDiscount, monthlyDiscount, fullDiscount] = getByIds('budgets-amount', 'budgets-option', 'budgets-discount', 'monthly-discount', 'full-discount');

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
    let fullPrice = initialPrice;

    budgetsDiscount.classList.toggle('hidden', !discountTimes);

    if (discountTimes) {
        fullPrice *= 1 - (5 / 100) ** discountTimes;

        const mensalDiscount = (initialPrice - fullPrice) / totalMonths,
            mensalDiscountTxt = mensalDiscount.toLocaleString('pt-br', { style: 'currency', currency: 'BRL'}),
            fullDiscountTxt = (initialPrice - fullPrice).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

            monthlyDiscount.innerHTML = mensalDiscountTxt;
            fullDiscount.innerHTML = fullDiscountTxt;
    };

    console.log(fullPrice);
};

function getByIds(...ids) {
    return ids.map(id => document.getElementById(id));
};
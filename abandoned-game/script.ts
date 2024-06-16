if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

let Point: number = 0;
let BuyCount: number[] = [0];
let SecondPoint: number = 1;
$(function (): void {
    $("div#shop button").on("click", Buy)
        .hover(Hover);
    PrevTime = Date.now();
    Update();
})

let PrevTime: number;

function Buy(this: HTMLElement): void {
    const id: number = $("div#shop").children().index(this);
    if (Point >= Cost(id)) {
        Point -= Cost(id);
        BuyCount[id] += 1;
    }
}

function Hover(this: HTMLElement): void {
    $("#item").text($(this).text());
    $("#item-cost").text(Cost($("div#shop").children().index(this)));
}

function Update(): void {
    SecondPoint = 1 + BuyCount[0];
    Point += SecondPoint * (Date.now() - PrevTime) / 1000;
    $('#point').text(`${Math.floor(Point)}ポイント`);
    $('#second-point').text(`${Math.round(SecondPoint)}ポイント/s`);
    PrevTime = Date.now();
    requestAnimationFrame(Update);
}

function Cost(id:number): number {
    return (
        id==0?Math.floor((1.4 ** (BuyCount[id] * 1.4))-(1.1 ** (BuyCount[id] * 0.08)))+10:
        0
    );
}
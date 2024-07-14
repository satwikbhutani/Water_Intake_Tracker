const goalAmount = prompt("Enter your daily water intake goal in Liters: \n(Assuming 1 glass contains 250 mL of water)");
const goalAmountSpan = document.getElementById('goalAmount');
goalAmountSpan.textContent = goalAmount;

const bigCupSize = 1000;
const smallCupSize = 250;

const totalSmallCups = Math.ceil(goalAmount * 1000 / smallCupSize); // Calculate total number of small cups needed

const smallCupsContainer = document.getElementById('smallCupsContainer');
smallCupsContainer.innerHTML = '';

for (let i = 0; i < totalSmallCups; i++) {
    const cup = document.createElement('div');
    cup.classList.add('cup', 'cup-small');
    cup.textContent = `${smallCupSize} ml`;
    smallCupsContainer.appendChild(cup);
}

const smallCups = document.querySelectorAll('.cup-small');
const liters = document.getElementById('liters');
const percentage = document.getElementById('percentage');
const remained = document.getElementById('remained');

updateBigCup();

smallCups.forEach((cup, idx) => {
    cup.addEventListener('click', () => highlightCups(idx));
});

function highlightCups(idx) {
    if (idx === totalSmallCups - 1 && smallCups[idx].classList.contains("full")) {
        idx--;
    } else if (smallCups[idx].classList.contains('full') && !smallCups[idx].nextElementSibling.classList.contains('full')) {
        idx--;
    }

    smallCups.forEach((cup, idx2) => {
        if (idx2 <= idx) {
            cup.classList.add('full');
        } else {
            cup.classList.remove('full');
        }
    });

    updateBigCup();
}

function updateBigCup() {
    const fullCups = document.querySelectorAll('.cup-small.full').length;
    const percentageHeight = fullCups / totalSmallCups * 100;

    percentage.style.visibility = 'visible';
    percentage.style.height = `${percentageHeight}%`;
    percentage.innerText = `${Math.round(percentageHeight)}%`;

    const remainingLiters = goalAmount - (smallCupSize * fullCups / 1000);
    liters.innerText = `${remainingLiters.toFixed(1)}L`;

    if (fullCups === totalSmallCups) {
        remained.style.visibility = 'hidden';
        remained.style.height = 0;
    } else {
        remained.style.visibility = 'visible';
    }
}

export class Favorites {
    constructor(root) {
        document.querySelector(root);

        this.load();
    }

    load() {
        this.entries = [
            {
                login: 'DenilsonJunior',
                repositories: 76,
                followers: 958
            },
            {
                login: 'CarlosAlberto1991',
                repositories: 47,
                followers: 360
            },
        ]
    }
}

export class FavoritesView extends Favorites {
    constructor(root) {
        super(root);

        this.tbody = document.querySelector('table tbody');

        this.update();
    }

    update() {
        this.removeAllTr();

        this.entries.forEach((user) => {
            const row = this.createRow();

            row.querySelector('.user img').src = `https://github.com/${user.login}.png`;
            row.querySelector('.user img').alt = `Imagem de ${user.login}.`;
            row.querySelector('.user a').href = `https://github.com/${user.login}`;
            row.querySelector('.user a p').innerText = `${user.login}`;
            row.querySelector('.repositories').innerText = `${user.repositories}`;
            row.querySelector('.followers').innerText = `${user.followers}`;

            this.tbody.append(row)
        });
    }

    createRow() {
        const tr = document.createElement('tr');

        tr.innerHTML =  `
            <td class="user">
                <img src="" alt="">
                <a target="_blank" href="DenilsonJunior">
                    <p></p>
                </a>
            </td>
            <td class="repositories"></td>
            <td class="followers"></td>
            <td>
                <button class="remove">Remover</button>
            </td>
        `

        return tr
    }

    removeAllTr() {
        this.tbody.querySelectorAll('tr').forEach((tr) => {
            tr.remove();
        });        
    }
}
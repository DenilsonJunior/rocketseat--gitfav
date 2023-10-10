import { GithubUser } from './GitUser.js'

export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root);
        this.load();

        // GithubUser.search('DenilsonJunior').then(user => console.log(user));
    }

    load() {
        this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || [];
    }

    save() {
        localStorage.setItem('@github-favorites:', JSON.stringify(this.entries));
    }

    async add(username) {
        try {

            const userExists = this.entries.find(entry => entry.login === username);

            if(userExists) {
                throw new Error('Usuário já cadastrado');
            }

            const user = await GithubUser.search(username);
            
            if( user.login === undefined ) {
                throw new Error('Usuário não encontrado');
            }

            this.entries = [user, ...this.entries];
            this.update();
            this.save();

        } catch (error) {
            alert(error.message)
        }
    }

    delete(user) {
        const filteredEntries = this.entries
            .filter(entry => entry.login !== user.login);
        
        this.entries = filteredEntries;
        this.update();
        this.save();
    }
}

export class FavoritesView extends Favorites {
    constructor(root) {
        super(root);

        this.tbody = document.querySelector('table tbody');

        this.update();
        this.onadd();
    }

    onadd() {
        const addButton = this.root.querySelector('.search button');

        addButton.onclick = () => {
            const { value } = this.root.querySelector('.search input');

            this.add(value);
        }
    }

    update() {
        this.removeAllTr();

        this.entries.forEach((user) => {
            const row = this.createRow();

            row.querySelector('.user img').src = `https://github.com/${user.login}.png`;
            row.querySelector('.user img').alt = `Imagem de ${user.login}.`;
            row.querySelector('.user a').href = `https://github.com/${user.login}`;
            row.querySelector('.user a p').innerText = `${user.login}`;
            row.querySelector('.user a span').innerText = `${user.login}`;
            row.querySelector('.repositories').innerText = `${user.public_repos}`;
            row.querySelector('.followers').innerText = `${user.followers}`;

            row.querySelector('.remove').onclick = () => {
                const isOk = confirm('Você realmente deseja remover a linha?')

                if(isOk) {
                    this.delete(user);
                }
            }

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
                    <span></span>
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
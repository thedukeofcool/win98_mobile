export class AppsScreen {
    constructor(apps) {
        let content = document.getElementById('content');

        let appScreen = document.createElement('div');
        appScreen.id = 'apps';
        appScreen.className = 'appScreen';

        content.appendChild(appScreen);

        apps.forEach(app => {
            let appElement = document.createElement('button');
            appElement.className = 'default appTile';
            appElement.setAttribute('onclick', 'open_app("' + app.id + '")'); // horrible code to get around some weird issue

            let icon = document.createElement('img');
            icon.src = './sys/resources/img/png/' + app.icon + '_icon.png';
            icon.alt = 'Icon';

            let title = document.createElement('nei');
            title.innerText = app.title;
            title.className = 'appTitle';

            appElement.appendChild(icon);
            appElement.appendChild(title);

            appScreen.appendChild(appElement);
        });
    }
}
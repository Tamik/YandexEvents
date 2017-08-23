# Яндекс.События
Приложение Яндекс.События в рамках проекта &laquo;Мобилизация&raquo;  
Поддерживаемые платформы: iOS, Android, Web.

## Регламент работы
Разработка приложения производится по методологии [GitHub Flow](https://guides.github.com/introduction/flow/). Основная ветка – `master`. В данной ветке всегда должна быть стабильно работающая версия приложения. В релизных циклах на коммит ставится `tag`.
Каждый разработчик работает в отдельной ветке, которую он именует в соответствии с постановленной задачей, либо разрабатываемой фичей. `master` является **защищенной** веткой, поэтому все вливания происходят через pull requests. В каждом pull request будет производиться код-ревью.  
Коммиты желательно писать на русском языке. В pull requests описывать то, что было сделано (если было сделано много). Так же желательно добавлять лейблы к своим <abbr title="pull request">pr</abbr>.

## Установка
- `npm install -g cordova` – перед клонированием репозитория приложение требуется глобально установленная Cordova
- `git clone https://github.com/Tamik/YandexEvents.git` – склонировать репозиторий
- `npm install` – установить все требуемые зависимости

### Develop Environment
- `npm run dev` – запустить dev окружение (требуется запуск в отдельной консольной вкладке/окне)
- `npm run [platform]` – запустить приложение на требуемой платофрме (доступны: `ios`, `android`, `browser`)

### Production Environment
- `npm run prod` – собрать исходный код в production окружении
- `cordova prepare` – подготовить билд для сборки
- `cordova build [platform]` – собрать приложение под требуемые платформу (доступны: `ios`, `android`, `browser`)


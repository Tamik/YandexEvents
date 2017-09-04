# Яндекс.События
Приложение Яндекс.События в рамках проекта &laquo;Мобилизация&raquo;  
Поддерживаемые платформы: iOS, Android, Web.

## Регламент
Разработка приложения производится по методологии [GitHub Flow](https://guides.github.com/introduction/flow/). Основная ветка – `master`. В данной ветке всегда должна быть стабильно работающая версия приложения. В релизных циклах на коммит ставится `tag`.
Каждый разработчик работает в отдельной ветке, которую он именует в соответствии с постановленной задачей, либо разрабатываемой фичей (например, `readme-update`). `master` является **защищенной** веткой, поэтому все вливания происходят через pull requests. В каждом pull request должно производиться код-ревью.  
Pull requests именовать на русском языке, а так же указывать номер задачи в СтарТреке. В описании писать о том, что было сделано. Так же добавлять labels и milestones к своим <abbr title="pull request">pr</abbr>.

## Установка
- `npm install -g cordova` – перед клонированием репозитория требуется глобально установленная Cordova
- `git clone https://github.com/Tamik/YandexEvents.git` – склонировать репозиторий
- `npm install` – установить все требуемые зависимости

### Develop Environment
- `npm run dev` – запустить dev окружение (требуется запуск в отдельной консольной вкладке/окне)
- `npm run [platform]` – запустить приложение на требуемой платформе (доступны: `ios`, `android`, `browser`)

### Production Environment
- `npm run prod` – собрать исходный код в production окружении
- `cordova prepare` – подготовить билд для сборки
- `cordova build [platform]` – собрать приложение под требуемую платформу (доступны: `ios`, `android`, `browser`)

## Команда разработки
<table>
    <tr">
      <td align="center">
        <a href="https://github.com/Tamik">
          <img width="150" height="150" src="https://static.yamblz.ru/events/team/lokyaev.jpg">
        </a>
        <br>
        <a href="https://github.com/Tamik">Тамерлан Локьяев</a>
      </td>
      <td align="center">
        <a href="https://github.com/cybri0nix">
          <img width="150" height="150" src="https://static.yamblz.ru/events/team/bekenov.jpg">
        </a>
        <br>
        <a href="https://github.com/cybri0nix">Балтабек Бекенов</a>
      </td>
      <td align="center">
        <a href="https://github.com/Lunory">
          <img width="150" height="150" src="https://static.yamblz.ru/events/team/belokuraya.jpg">
        </a>
        <br>
        <a href="https://github.com/Lunory">Ангелина Белокурая</a>
      </td>
    <tr>
</table>

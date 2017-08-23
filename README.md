# Яндекс.События
Приложение Яндекс.События в рамках проекта &laquo;Мобилизация&raquo;  
Поддерживаемые платформы: iOS, Android, Web.

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


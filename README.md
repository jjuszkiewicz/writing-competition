# Uruchomienie projektu

w katalogu backend uruchamiamy dockera z bazą danych oraz server nodejs:

    docker-compose build
    docker-compose up -d
    npm i
    npm run dev

następnie w katalogu frontend uruchamiamy aplikacje next.js

    npm i
    npm run dev


# Koncepcja i przemyślenia

Użytkownik wchodzi na stronę główną i dołącza się do konkursu. Wpisuje swoje imię i po naciśnięciu „Join” otrzymuje JWT z API z swoim unikalnym uuid.

Zadanie API oprócz zapisywania danych jest, aby zarządzała rundami. To backend steruje, kiedy runda się zaczyna i wylicza wynik.
Frontend odpytuje się API po aktualną rundę. API zwraca potrzebna dane takie jak uuid rundy, zdanie itp.. następnie użytkownik wpisuje swoje zdanie w pole i poprzez przycisk Enter wysyła wynik. 
Tu nie udało się skończyć pełnej funkcjonalności. Wyniki się wysyłają, ale nie widać efektu. Brak blokady ponownego wysyłania, chodź API nie pozwala wpisać więcej wyników temu samemu użytkownikowi na rundę. Brak wyników w tabeli.
Natomiast udało się zrobić, aby mimo odświeżenia strony użytkownik dalej był w tej samej rundzie.
Po skończeniu się rundy, frontend odpytuje o nową rundę.

Wyliczenia i czas rundy jest po stronie backendu. 
Chciałem wykonać komunikację poprzez MQTT aby wyniki były widoczne od razu gdy ktoś inny skończy.


Co nie udało się zrobić

- Tabeli wyników, 
- Komunikacji po MQTT, chciałem aby tabela wyników aktualizowała się po przez MQTT w czasie rzeczywistym
- Przechodzenie od razu od rundy, gdy użytkownik powraca na stronę
- Testów
- Zdania w bazie danych, obecnie wpisane na sztywno w aplikację

## Przemyślenia
3h na takie zadanie to bardzo mało. Nawet jeden dzień nie jest wystarczający. Kilka zagadnień trzeba przemyśleć przy real-time plus implementacja tego i testy. Następnie poprawka stabilności.
Obecne rozwiązanie zajęło mi więcej niż 5h, a jeszcze czuje może moja koncepcja może być lepsza.

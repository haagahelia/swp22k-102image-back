# Checkout the Database Using VM 

1. Open Putty
2. In the Host Name input box, add "195.148.22.114". Keep the port as 22
3. Click "Open"
4. A console will be open with the line "login as:", type "juuuser1"
5. The console will then ask for password, type the provided password in Teams accordingly 
6. Type

    sudo mysql

7. You will be prompted for password once again, type the password in
8. You're now using MariaDB, select the database by typing

    use swp22k_102image;

9. You can check the available tables by typing

    show tables;
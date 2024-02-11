# Order - 
    <!-- mandatory -->
    - date
    - id

    <!-- customer data -->
    - customer's name
    - customer's phone number

    <!-- materials data -->
    - name
    - width
    - length
    - count

    <!-- prices -->
    - drill holes
    - price per cut
    - price per category
    - express order +25% option ( if checked recalculate the total price)
    - total price

    <!-- cashier notes -->
    - no refunds policy etc

# Storage of orders
    - Node express server on Render.com with firebase for storing orders and the node server for formatting the user input as a pdf file and sending it back for printing

# Form input values 
    <!-- id is auto-generated uuid -->
    customer's first name
    customer's last name
    customer's phone number
    the item's id
    description of the service
    mark drillhiles
    mark hinges
    important info - the center of drilling is 8cm away ( change )

    <!--  -->
    display generated price
    display generated code
    send form data to the web server and await for callback with generated pdf

# Admin privileges 
    Heavy incline towards using Django just for the admin panel, sigh
    full crud operations on any Order stored in the postgres database
    - maybe as a replacement of Node later


<?php

  // Database connection details

  $db_host = "localhost";

  $db_user = "postgres";

  $db_pass = "mysecretpassword";

  $db_name = "my-postgres-db";



  $conn = new mysqli($db_host, $db_user, $db_pass, $db_name);



  if ($conn->connect_error) {

    die("Connection failed: " . $conn->connect_error);

  }



  // Get input from form

  $search_term = $_POST['search_term'];



  // Construct query

  $sql = "SELECT * FROM myTable WHERE column_name LIKE '%" . $search_term . "%'";



  // Execute query

  $result = $conn->query($sql);



  // Display results

  if ($result->num_rows > 0) {

    echo "<table>";

    while($row = $result->fetch_assoc()) {

      echo "<tr><td>" . $row["column1"] . "</td><td>" . $row["column2"] . "</td></tr>";

    }

    echo "</table>";

  } else {

    echo "No results found";

  }



  $conn->close();

?>

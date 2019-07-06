from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support import expected_conditions as EC


driver = webdriver.Firefox()
driver.get("http://localhost:3000")
try:
    WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.ID, "startingAthlete")))
    driver.find_element_by_id("startButton").click()
except TimeoutException:
    print("Database isn't connected")
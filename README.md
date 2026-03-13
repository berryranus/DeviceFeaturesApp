# 📱 DeviceFeaturesApp - Native Hardware Integration

**DeviceFeaturesApp** is a powerful React Native (Expo) application designed to demonstrate the seamless integration between JavaScript-based UI and native mobile hardware components. It acts as a technical showcase for accessing device sensors, media libraries, and OS-level functionalities.

---

## 🚀 Project Purpose

The primary goal of this project is to bridge the gap between software and physical hardware. Moving beyond standard data fetching and state management, this application focuses on:
* **Hardware Utilization:** Safely accessing the device's camera, GPS sensor, and haptic motors.
* **Permission Management:** Handling OS-level security dialogues gracefully to ensure a smooth user experience.
* **Deep Linking:** Interacting with native system applications (like Apple Maps or Google Maps) directly from within the app.

---

## 🛠️ Tech Stack & Architecture

This project is built using a modular component structure and heavily relies on official Expo native modules:

### 1. Core Framework & Navigation
* **React Native (Expo SDK 54):** The foundational framework.
* **React Navigation (`native-stack`):** Manages the routing between the Home dashboard and the specific feature screens (Camera / Location).

### 2. Native Hardware Modules
* **`expo-image-picker`:** Utilized to interact with the device's camera hardware and photo gallery, allowing users to capture or select high-quality images.
* **`expo-location`:** Hooks into the device's GPS chip to retrieve highly accurate, real-time geographical coordinates (latitude and longitude).
* **`expo-haptics`:** Provides tactile, physical feedback (vibrations) to confirm successful actions to the user.
* **`expo-notifications`:** Triggers local push notifications directly from the device itself without needing an external cloud server.

---

## 📱 Key Features

### ✅ Camera & Media Library Access
Users can choose to snap a new photo directly using their camera or pick an existing image from their media library. The app handles the cropping, aspect ratio (`16:9` or `4:3`), and quality configuration dynamically before rendering the selected image.

### ✅ Real-Time Geolocation
With a single tap, the app requests foreground location permissions and fetches the user's exact coordinates. 

### ✅ Immersive User Feedback
Upon successfully retrieving the GPS location, the app simultaneously fires a success haptic vibration (`Haptics.NotificationFeedbackType.Success`) and schedules an instant local push notification, providing a multi-sensory confirmation to the user.

### ✅ Native Map Deep Linking
Instead of rendering a heavy, in-app map view, the application uses React Native's `Platform` and `Linking` modules to dynamically construct a URL scheme. This smartly opens the user's default OS navigation app (Apple Maps on iOS, Google Maps on Android) pinning their exact location.

---

## 💡 Challenges & Solutions

During development, interacting with native hardware presented specific challenges:

### 1. Asynchronous Security Permissions
* **Challenge:** Modern operating systems strictly block unauthorized access to cameras and GPS. Attempting to use these features without explicit permission causes instant app crashes.
* **Solution:** I implemented robust asynchronous permission checks (`requestForegroundPermissionsAsync` and `requestMediaLibraryPermissionsAsync`). The app gracefully halts the hardware call and displays a user-friendly `Alert` if permissions are denied.

### 2. Platform-Specific Deep Linking
* **Challenge:** iOS and Android use completely different URL schemes to trigger their native map applications.
* **Solution:** I utilized the `Platform.select()` method. If the device is iOS, the app constructs a `maps:0,0?q=` URL. If it's Android, it constructs a `geo:0,0?q=` URL. This ensures the "View on Map" button works flawlessly regardless of the operating system.

---

## 📂 Project Structure

```bash
DeviceFeaturesApp/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js      # Navigation dashboard
│   │   ├── CameraScreen.js    # Logic for ImagePicker and Camera
│   │   └── LocationScreen.js  # Logic for GPS, Haptics, Notifications, and Linking
├── App.js                     # Root Stack Navigator setup
└── package.json

```

---

## 🚀 How to Set Up and Run the Project
Please follow these instructions to test the hardware features on your local machine.

## 1. Prerequisites

Node.js: (Version 18 or higher)

Expo Go App: Installed on your physical mobile device.
(Note: Hardware features like Camera and Haptics cannot be fully tested on desktop simulators).

## 2. Installation Steps

### Step 1: Clone the Repository

```bash
git clone [https://github.com/berryranus/DeviceFeaturesApp.git](https://github.com/berryranus/DeviceFeaturesApp.git)
cd DeviceFeaturesApp
```

### Step 2: Install Dependencies

```bash
npm install
```

## 3. Running the Application

### Step 3: Start the Server
```bash
npx expo start
```

### Step 4: Launch on Your Device
Scan the QR code displayed in your terminal using the Expo Go app (Android) or your default Camera app (iOS).

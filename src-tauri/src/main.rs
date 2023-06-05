#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use socket2::{Domain, Protocol, Socket, Type};
use std::io::{Read, Write};
use std::net::SocketAddr;

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
struct SendType {
    data: Vec<i32>,
}

#[derive(Serialize, Deserialize, Debug)]
struct ReceiveType {
    aiWin: bool,
    data: Vec<i32>,
}

#[tauri::command]
fn socket(aiWin: bool, data: Vec<i32>) -> SendType {
    let receive = ReceiveType {
        aiWin: aiWin,
        data: data,
    };

    let mut socket = Socket::new(Domain::IPV4, Type::STREAM, Some(Protocol::TCP)).unwrap();
    let addr: SocketAddr = "127.0.0.1:18080".parse().unwrap();

    socket.connect(&addr.into()).unwrap();

    socket
        .write_all(serde_json::to_string(&receive).unwrap().as_bytes())
        .unwrap();

    let mut buf = [0; 1024];
    let len = socket.read(&mut buf).unwrap();

    let response = String::from_utf8_lossy(&buf[..len]);

    serde_json::from_str(&response).unwrap()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![socket])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

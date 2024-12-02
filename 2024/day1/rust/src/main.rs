use anyhow::{bail, Result};
use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;

mod part1;

fn main() -> Result<()> {
    // Parse arguments
    let args = std::env::args().collect::<Vec<_>>();
    match args.len() {
        0 | 1 => bail!("Missing part and file"),
        _ => {}
    }

    let file = &args[1];
    let part = &args[2];

    println!("File: {file}, part :{part}");

    // File hosts.txt must exist in the current path
    let lines = read_lines(file).expect("file not found");

    // Parse command and act accordingly
    match part.as_str() {
        "p1" => part1::execute(lines),
        "p2" => part1::execute(lines),
        _ => bail!("Missing or invalid command passed: {}", part),
    }

    Ok(())
}

// The output is wrapped in a Result to allow matching on errors
// Returns an Iterator to the Reader of the lines of the file.
fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where
    P: AsRef<Path>,
{
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}

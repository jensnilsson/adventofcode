use std::{
    fs::File,
    io::{BufReader, Lines},
};

pub fn execute(lines: Lines<BufReader<File>>) {
    let sum: u32 = lines
        .map(|line| {
            let line = line.unwrap();
            let first_num = line
                .chars()
                .find(|char| char.is_ascii_digit())
                .unwrap()
                .to_digit(10)
                .unwrap()
                * 10;
            let last_num = line
                .chars()
                .rev()
                .find(|char| char.is_ascii_digit())
                .unwrap()
                .to_digit(10)
                .unwrap();
            print!("{line} {first_num} {last_num} \n");
            first_num + last_num
        })
        .sum();

    print!("sum: {sum}");
}

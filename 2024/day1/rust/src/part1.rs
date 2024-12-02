use std::{
    fs::File,
    io::{BufReader, Lines},
};

pub fn execute(lines: Lines<BufReader<File>>) {
    let (vec1, vec2): (Vec<isize>, Vec<isize>) = lines
        .map(|line| {
            let line = line.unwrap();
            let mut items = line.split("   ").lines();
            let Some(first_item) = items.next();
            let Some(second_item) = items.next();
            (first_item, second_item)
        })
        .unzip();

    vec1.sort();
    vec2.sort();

    sum = 0;
    print!("sum: {sum}");
}

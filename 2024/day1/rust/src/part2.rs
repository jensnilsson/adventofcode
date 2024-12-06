use std::{
    fs::File,
    io::{BufReader, Lines},
};

pub fn execute(lines: Lines<BufReader<File>>) {
    let (mut vec1, vec2): (Vec<i64>, Vec<i64>) = lines
        .map(|line| {
            let line = line.unwrap();
            let items: Vec<&str> = line.split_whitespace().collect();
            let first_item = *items.first().expect("shoud always exist");
            let first_value = first_item.parse::<i64>().expect("should be number");
            let second_item = *items.last().expect("shoud always exist");
            let second_value = second_item.parse::<i64>().expect("should be number");
            (first_value, second_value)
        })
        .unzip();

    let sum: i64 = vec1
        .iter()
        .map(|(item)| {
            let occurance = vec2.iter().filter(|item2| item == *item2).count() as i64;
            item * occurance
        })
        .sum();

    print!("sum: {sum}");
}

resource "aws_eip_association" "eip_assoc-fe" {
  instance_id   = aws_instance.front_end.id
  allocation_id = "eipalloc-0f679eef584322357"
}

resource "aws_instance" "front_end" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"
  key_name      = "krutarth"
  tags = {
    Name = "front_end"
  }
   connection {
    type        = "ssh"
    user        = "ubuntu"
    private_key = file("krutarth.pem")
    host =  self.public_ip
    timeout = "3m"
  } 

  provisioner "file" {
        source      = "script-fe.sh"
        destination = "/home/ubuntu/script-fe.sh"
    }
  
    provisioner "file" {
        source      = "front-end.nginx"
        destination = "/home/ubuntu/front-end.nginx"
    }
    provisioner "remote-exec" {
        inline = [
            "chmod +x /home/ubuntu/script-fe.sh",
            "/home/ubuntu/script-fe.sh args",
        ]
    }
}

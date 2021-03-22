resource "aws_eip_association" "eip_assoc" {
  instance_id   = aws_instance.back_end.id
  allocation_id = "eipalloc-0378c6a05d4d9660e"
}



resource "aws_instance" "back_end" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"
  key_name      = "krutarth"
  tags = {
    Name = "back_end"
  }
   connection {
    type        = "ssh"
    user        = "ubuntu"
    private_key = file("krutarth.pem")
    host =  self.public_ip
    timeout = "3m"
  } 

  provisioner "file" {
        source      = "script-be.sh"
        destination = "/home/ubuntu/script-be.sh"
    }
  provisioner "file" {
        source      = "back-end.service"
        destination = "/home/ubuntu/back-end.service"
    }
    provisioner "file" {
        source      = "back-end.nginx"
        destination = "/home/ubuntu/back-end.nginx"
    }
    provisioner "file" {
        source      = "wsgi.py"
        destination = "/home/ubuntu/wsgi.py"
    }
    

    provisioner "remote-exec" {
        inline = [
            "chmod +x /home/ubuntu/script-be.sh",
            "/home/ubuntu/script-be.sh args",
        ]
    }
}
